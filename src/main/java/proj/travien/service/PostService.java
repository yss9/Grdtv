package proj.travien.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import proj.travien.domain.Addresses;
import proj.travien.domain.Post;
import proj.travien.dto.AddressResponseDto;
import proj.travien.repository.ImageRepository;
import proj.travien.repository.PostRepository;

import java.util.*;

@Service
public class PostService {

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private ImageRepository imageRepository;


//	public BoardService(BoardRepository bRepo, ReplyRepository rRepo) {
//		this.boardRepository = bRepo;
//		this.replyRepository = rRepo;
//	}

    @Transactional
    public void writePost(Post post) { // title, body, address
        post.setCount(0);
       // post.setUser(user); user 가져오기
        postRepository.save(post);
    }

    @Transactional(readOnly = true)
    public Page<Post> postList(Pageable pageable){
        return postRepository.findAll(pageable);
    }


    @Transactional(readOnly = true)
    public Post postDetail(Long boardId) {
        return postRepository.findById(boardId)
                .orElseThrow(()->{
                    return new IllegalArgumentException("글 상세보기 실패 : 아이디를 찾을 수 없습니다.");
                });
    }

    @Transactional
    public void postDelete(Long boardId) {
        System.out.println("글삭제하기 : "+ boardId);
        postRepository.deleteById(boardId);
    }


    @Transactional
    public void postModify(Long boardId, Post requestBoard) {
        Post post = postRepository.findById(boardId)
                .orElseThrow(()->{
                    return new IllegalArgumentException("글 찾기 실패 : 아이디를 찾을 수 없습니다.");
                }); // 영속화 완료
        post.setTitle(requestBoard.getTitle());
        post.setBody(requestBoard.getBody());
        // 해당 함수로 종료시(Service가 종료될 때) 트랜잭션이 종료됩니다. 이때 더티체킹 - 자동 업데이트가 됨. db flush
    }



  /*  @Transactional
    public void 댓글쓰기(ReplySaveRequestDto replySaveRequestDto) {
        int result = replyRepository.mSave(replySaveRequestDto.getUserId(), replySaveRequestDto.getBoardId(), replySaveRequestDto.getContent());
        System.out.println("BoardService : "+result);
    }

    @Transactional
    public void 댓글삭제(int replyId) {
        replyRepository.deleteById(replyId);
    }*/








    private static final String UPLOAD_DIR = "src/main/resources/static/image/";


    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }




  /*  public Post createPost(MultipartFile image, String title, String body, Set address) throws IOException {
        // 이미지 저장
        String fileName = image.getOriginalFilename();
        byte[] bytes = image.getBytes();
        Path path = Paths.get(UPLOAD_DIR + fileName);
        Files.write(path, bytes);

        // Post 객체 생성 및 저장
        Post post = new Post(title, body, path.toString(), address); // 이미지 파일의 경로를 저장
        post.setImageUrl("http://localhost:8000/api/posts/" + post.getBoardID() + "/image"); // 이미지 URL 설정
        return postRepository.save(post);
    }
*/

    /**
     * 게시물 업로드
     */
    public Post createPost(String title, Set<Addresses> addressStrings, String addressTitle) {
        Post post = new Post();
        post.setTitle(title);
        post.setAddressTitle(addressTitle);

        Set<Addresses> addresses = new HashSet<>();
        for (Addresses address : addressStrings) {
            address.setPost(post);
            addresses.add(address);
        }

        post.setAddresses(addresses);

        return postRepository.save(post);
    }

      /* public Optional<Post> getPostById(Long id) {
        Optional<Post> post = postRepository.findById(id);
        if (post.isPresent()) {
            Post fetchedPost = post.get();
            fetchedPost.setImageUrl("http://localhost:8000/api/posts/" + fetchedPost.getBoardID() + "/image");
            return Optional.of(fetchedPost);
        }
        return Optional.empty();
    }*/


    /**
     * 게시물 가져오기
     */
    public Optional<Post> getPostById(Long id) {
        Optional<Post> post = postRepository.findById(id);
        if (post.isPresent()) {
            Post fetchedPost = post.get();
            fetchedPost.setImageUrl("http://localhost:8000/api/posts/" + fetchedPost.getBoardID() + "/image");
            return Optional.of(fetchedPost);
        }
        return Optional.empty();
    }



    /**
     *  루트 추천 (특정 placename에 맞는 포스트 검색)
     */
    @Transactional(readOnly = true)
    public AddressResponseDto getPostAddressesByPlaceName(String placename) {
        // 검색을 위해 placename을 정규화 (공백 및 특수문자 제거)
        String normalizedPlacename = placename.replaceAll("\\s+", "").replaceAll("[^\\p{IsAlphabetic}\\p{IsDigit}]", "");

        List<Post> posts = postRepository.findAll();

        // placename과 일치하는 주소 또는 제목이 있는 포스트를 찾음
        Optional<Post> matchingPost = posts.stream()
                .filter(post -> {
                    // 제목과 주소를 정규화 (공백 및 특수문자 제거)
                    String normalizedTitle = post.getAddressTitle().replaceAll("\\s+", "").replaceAll("[^\\p{IsAlphabetic}\\p{IsDigit}]", "");

                    // placename이 제목에 포함되어 있는지 확인
                    boolean titleMatches = normalizedTitle.contains(normalizedPlacename);

                    // placename이 주소에 포함되어 있는지 확인
                    boolean addressMatches = post.getAddresses().stream()
                            .anyMatch(address -> {
                                String normalizedAddress = address.getAddress().replaceAll("\\s+", "").replaceAll("[^\\p{IsAlphabetic}\\p{IsDigit}]", "");
                                return normalizedAddress.contains(normalizedPlacename);
                            });

                    return titleMatches || addressMatches;
                })
                .findFirst();

        if (matchingPost.isPresent()) {
            Post post = matchingPost.get();
            return new AddressResponseDto(post.getAddressTitle(), post.getAddresses());
        } else {
            throw new IllegalStateException("추천되는 게시물 없음");
        }
    }






    public Post updatePost(Long id, Post updatedPost) {
        return postRepository.findById(id)
                .map(post -> {
                    post.update(updatedPost.getTitle(), updatedPost.getBody(), updatedPost.getImage(), updatedPost.getAddresses());
                    return postRepository.save(post);
                })
                .orElseThrow(() -> new RuntimeException("Post not found with id " + id));
    }

    public void deletePost(Long id) {
        postRepository.deleteById(id);
    }


}
