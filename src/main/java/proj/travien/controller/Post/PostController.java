package proj.travien.controller.Post;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import proj.travien.domain.Post;
import proj.travien.dto.Post.PostForm;
import proj.travien.service.Post.PostService;

@Controller
@RequestMapping("/posts")
@Slf4j
public class PostController {

    @Autowired
    PostService postService;

    public PostController(PostService postService) {
        this.postService = postService;
    }


    @GetMapping("/{postId}")
    public String postDetailPage(@PathVariable("postId") Long postId, Model model) {
        Post post = postService.getPost(postId);
        model.addAttribute("post", post);
        return "/posts/detailPage";
    }

    @GetMapping("/delete/{postId}")
    public String postDelete(@PathVariable("postId") Long postId, @PathVariable("blogId") Long blogId) {
        postService.removePostById(postId);
        return "redirect:/blog/" + blogId;
    }

    @GetMapping("/update/{postId}")
    public String postUpdate(@PathVariable("postId") Long postId, Model model) {
        Post post = postService.getPost(postId);
        model.addAttribute("post", post);

        return "/posts/updatePage";
    }

    @PostMapping("/update/{postId}")
    public String postUpdate(@PathVariable("postId") Long postId, @PathVariable("blogId") Long blogId, PostForm postDto) {
        postService.updatePost(postId, postDto);

        return "redirect:/blog/" + blogId;
    }
}

