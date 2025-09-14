package com.app.socialmedia.services;

import com.app.socialmedia.DTOs.PostCreateRequest;
import com.app.socialmedia.DTOs.PostResponse;
import com.app.socialmedia.DTOs.PostUpdateRequest;
import com.app.socialmedia.entities.Post;
import com.app.socialmedia.entities.User;
import com.app.socialmedia.repository.PostRepository;
import com.app.socialmedia.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PostService {

    private PostRepository postRepository;
    private UserService userService;

    public PostService(PostRepository postRepository, UserService userService){
        this.postRepository=postRepository;
        this.userService = userService;
    }

    public List<PostResponse> getAllPosts(Optional<Long> userId){
        List<Post> list;
        if(userId.isPresent()){
            list = postRepository.findByUserId(userId.get());
        }else {list = postRepository.findAll();}
        return list.stream().map(p -> new PostResponse(p)).collect(Collectors.toList());
    }

    public Post getOnePostById(Long postId){
        return postRepository.findById(postId).orElse(null);
    }

    public Post createOnePost(PostCreateRequest newPostRequest){
        User user = userService.getOneUser(newPostRequest.getUserId());
        if(user==null) return null;
        Post post = new Post();
        post.setUser(user);
        post.setText(newPostRequest.getText());
        post.setTitle(newPostRequest.getTitle());
        return postRepository.save(post);
    }

    public Post updateOnePostById(PostUpdateRequest updateRequest, Long postId){
        Optional<Post> post = postRepository.findById(postId);
        if(post.isPresent()){
            Post updatedPost = post.get();
            updatedPost.setTitle(updateRequest.getTitle());
            updatedPost.setText(updateRequest.getText());
            return postRepository.save(updatedPost);
        }
        return null;

    }

    public void deleteOnePostById(Long postId){
        postRepository.deleteById(postId);
    }


}
