package proj.travien.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import proj.travien.domain.Post;
import proj.travien.dto.ResponseDto;
import proj.travien.service.PostService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class PostApiController {
    @Autowired
    private PostService postService;

    @PostMapping("/ppap/board")
    public ResponseDto<Integer> save(@RequestBody Post post) {
        postService.writePost(post);
        return new ResponseDto<Integer>(HttpStatus.OK.value(), 1);
    }

    @DeleteMapping("/ppap/board/{id}")
    public ResponseDto<Integer> deleteById(@PathVariable Long boardId){
        postService.postDelete(boardId);
        return new ResponseDto<Integer>(HttpStatus.OK.value(), 1);
    }

    @PutMapping("/ppap/board/{id}")
    public ResponseDto<Integer> update(@PathVariable Long boardId, @RequestBody Post post){
        System.out.println("BoardApiController : update : id : " +boardId);
        System.out.println("BoardApiController : update : board : "+post.getTitle());
        System.out.println("BoardApiController : update : board : "+post.getBody());
        postService.postModify(boardId, post);
        return new ResponseDto<Integer>(HttpStatus.OK.value(), 1);
    }

    // 컨트롤로에서 세션을 어떻게 찾는지?
    // @AuthenticationPrincipal PrincipalDetail principal
    @GetMapping({"", "/"})
    public String index(Model model, @PageableDefault(size=3, sort="id", direction = Sort.Direction.DESC) Pageable pageable) {
        model.addAttribute("boards", postService.postList(pageable));
        return "index"; // viewResolver 작동!!
    }

    @GetMapping("/ppap/board/{boardId}")
    public String findById(@PathVariable Long boardId, Model model) {
        model.addAttribute("post", postService.postDetail(boardId));

        return "post/detail";
    }

    @GetMapping("/ppap/board/{id}/updateForm")
    public String updateForm(@PathVariable Long boardId, Model model) {
        model.addAttribute("board", postService.postDetail(boardId));
        return "board/updateForm";
    }

    // USER 권한이 필요
    @GetMapping("/ppap/board/saveForm")
    public String saveForm() {
        return "board/saveForm";
    }


   /* // 데이터 받을 때 컨트롤러에서 dto를 만들어서 받는게 좋다.
    // dto 사용하지 않은 이유는!!
    @PostMapping("/ppap/board/{boardId}/reply")
    public ResponseDto<Integer> replySave(@RequestBody ReplySaveRequestDto replySaveRequestDto) {
        boardService.댓글쓰기(replySaveRequestDto);
        return new ResponseDto<Integer>(HttpStatus.OK.value(), 1);
    }

    @DeleteMapping("/api/board/{boardId}/reply/{replyId}")
    public ResponseDto<Integer> replyDelete(@PathVariable int replyId) {
        boardService.댓글삭제(replyId);
        return new ResponseDto<Integer>(HttpStatus.OK.value(), 1);
    }*/

}
