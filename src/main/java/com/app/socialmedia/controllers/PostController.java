package com.app.socialmedia.controllers;

import com.app.socialmedia.DTOs.PostCreateRequest;
import com.app.socialmedia.DTOs.PostResponse;
import com.app.socialmedia.DTOs.PostUpdateRequest;
import com.app.socialmedia.entities.Post;
import com.app.socialmedia.services.PostService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/posts")

public class PostController {
    private PostService postService;

    public PostController(PostService postService){
        this.postService = postService;
    }

    @GetMapping
    public List<PostResponse> getAllPosts(@RequestParam Optional<Long> userId){
        return postService.getAllPosts(userId);
    }

    @GetMapping("/{postId}")
    public Post getOnePost(@PathVariable Long postId){
        return postService.getOnePostById(postId);
    }

    @PostMapping
    public Post createOnePost(@RequestBody PostCreateRequest request){
        return postService.createOnePost(request);
    }

    @PutMapping("/{postId}")
    public Post updateOnePost(@RequestBody PostUpdateRequest request, @PathVariable Long postId){
        return postService.updateOnePostById(request,postId);
    }

    @DeleteMapping("/{postId}")
    public void deletePost(@PathVariable Long postId){
        postService.deleteOnePostById(postId);
    }
}
