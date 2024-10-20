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
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

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
    public Post createPost(String title, String body, Set<Addresses> addressStrings,
                           String addressTitle, String country) {
        Post post = new Post();
        post.setTitle(title);
        post.setBody(body);
        post.setAddressTitle(addressTitle);
        post.setCountry(country);

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
     * 루트 추천 (특정 placename에 맞는 포스트 검색)
     */
    private final ObjectMapper objectMapper;

    public PostService(PostRepository postRepository, ObjectMapper objectMapper) {
        this.postRepository = postRepository;
        this.objectMapper = objectMapper;
    }


    @Transactional(readOnly = true)
    public List<AddressResponseDto> getPostAddressesByPlaceName(String placename) {
        // 검색을 위해 placename을 정규화 (공백 및 특수문자 제거)
        String normalizedPlacename = normalizeString(placename);

        List<Post> posts = postRepository.findAll();

        // placename과 일치하는 주소 또는 제목이 있는 모든 포스트를 찾음
        List<AddressResponseDto> matchingPosts = posts.stream()
                .filter(post -> {
                    // 제목과 주소를 정규화 (공백 및 특수문자 제거)
                    String normalizedTitle = normalizeString(post.getAddressTitle());

                    // placename이 제목에 포함되어 있는지 확인
                    boolean titleMatches = normalizedTitle.contains(normalizedPlacename);

                    // placename이 주소에 포함되어 있는지 확인
                    boolean addressMatches = post.getAddresses().stream()
                            .anyMatch(address -> {
                                String rawAddress = address.getAddress();

                                try {
                                    // 주소 문자열을 정리하여 JSON 배열로 변환
                                    String sanitizedAddress = sanitizeAddress(rawAddress);

                                    // JSON 배열 파싱
                                    List<String> addressList = objectMapper.readValue(sanitizedAddress, new TypeReference<List<String>>() {});

                                    // 각 주소 항목을 정규화하여 비교
                                    return addressList.stream()
                                            .map(this::normalizeString)
                                            .anyMatch(normalizedAddress -> normalizedAddress.contains(normalizedPlacename));
                                } catch (Exception e) {
                                    e.printStackTrace();
                                    return false;
                                }
                            });

                    return titleMatches || addressMatches;
                })
                .map(post -> new AddressResponseDto(post.getAddressTitle(), post.getAddresses(), post.getBoardID()))
                .collect(Collectors.toList());

        if (!matchingPosts.isEmpty()) {
            return matchingPosts;
        } else {
            throw new IllegalStateException("추천되는 게시물 없음");
        }
    }


    /**
     * 주소 문자열을 JSON 배열 형식으로 정리
     */
    private String sanitizeAddress(String rawAddress) {
        // 불완전한 JSON 배열 형식을 수정
        String sanitizedAddress = rawAddress;

        if (!sanitizedAddress.startsWith("[")) {
            sanitizedAddress = "[" + sanitizedAddress;
        }
        if (!sanitizedAddress.endsWith("]")) {
            sanitizedAddress = sanitizedAddress + "]";
        }

        // 잘못된 구문 제거 및 문자열 정리
        sanitizedAddress = sanitizedAddress.replaceAll("\\\\", "").replaceAll("\"\"", "\"");

        return sanitizedAddress;
    }

    /**
     * 문자열 정규화 (공백 및 특수문자 제거, 소문자 변환)
     */
    private String normalizeString(String input) {
        return input.replaceAll("\\s+", "").replaceAll("[^\\p{IsAlphabetic}\\p{IsDigit}]", "").toLowerCase();
    }


    /**
     * body에서 썸네일을 추출하는 메서드
     */

    private String extractThumbnail(String body) {
        // 정규식을 사용하여 첫 번째 <img> 태그에서 src 속성을 추출
        Pattern pattern = Pattern.compile("<img[^>]+src=\"([^\"]+)\"");
        Matcher matcher = pattern.matcher(body);
        if (matcher.find()) {
            return matcher.group(1);  // 첫 번째 src URL 반환
        }
        return null;  // 이미지가 없을 경우 null 반환
    }

    @Transactional
    public void saveThumbnail(Long boardID) {
        // 해당 boardID로 Post 엔티티 조회
        Post post = postRepository.findById(boardID)
                .orElseThrow(() -> new IllegalArgumentException("게시물을 찾을 수 없습니다: " + boardID));

        // body에서 썸네일 추출
        String thumbnail = extractThumbnail(post.getBody());

        // 추출한 썸네일을 Post 엔티티에 저장
        post.setThumbnail(thumbnail != null ? thumbnail : "이미지 없음");

        // 변경된 Post 엔티티 저장
        postRepository.save(post);
    }

    /**
     * 썸네일 반환
     */
    @Transactional(readOnly = true)
    public String getThumbnail(Long boardID) {
        // 게시물을 조회하여 썸네일을 가져옴
        Post post = postRepository.findById(boardID)
                .orElseThrow(() -> new IllegalArgumentException("게시물을 찾을 수 없습니다: " + boardID));

        // 썸네일이 존재하면 반환, 그렇지 않으면 null 반환
        return post.getThumbnail();
    }

    /**
     * 나라별 게시물 가져오기
     */
    @Transactional(readOnly = true)
    public List<Post> getPostsByCountry(String country) {
        return postRepository.findByCountry(country);
    }


    public Post updatePost(Long id, Post updatedPost) {
        return postRepository.findById(id)
                .map(post -> {
                    post.update(updatedPost.getTitle(), updatedPost.getBody(),updatedPost.getAddresses(),
                            updatedPost.getCountry(), updatedPost.getNickname(), updatedPost.getMbti());
                    return postRepository.save(post);
                })
                .orElseThrow(() -> new RuntimeException("Post not found with id " + id));
    }

    public void deletePost(Long id) {
        postRepository.deleteById(id);
    }

    /**
     * 검색
     */
    // 검색 기능 추가
    @Transactional(readOnly = true)
    public List<Post> searchPosts(String keyword) {
        return postRepository.findByKeyword(keyword);
    }

    @Transactional(readOnly = true)
    public List<Post> getPostsByUser(String nickname) {
        return postRepository.findByNickname(nickname);
    }



}
