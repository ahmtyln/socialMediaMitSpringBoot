package com.app.socialmedia.services;

import com.app.socialmedia.DTOs.CommentCreateRequest;
import com.app.socialmedia.DTOs.CommentUpdateRequest;
import com.app.socialmedia.controllers.CommentController;
import com.app.socialmedia.entities.Comment;
import com.app.socialmedia.entities.Post;
import com.app.socialmedia.entities.User;
import com.app.socialmedia.repository.CommentRepository;
import com.app.socialmedia.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CommentService {
    private CommentRepository commentRepository;
    private UserService userService;
    private PostService postService;

    public CommentService(CommentRepository commentRepository,UserService userService, PostService postService){
        this.commentRepository=commentRepository;
        this.userService = userService;
        this.postService = postService;
    }

    public List<Comment> getAllCommentsWithParam(Optional<Long> userId, Optional<Long> postId){
        if(userId.isPresent()){
            return  commentRepository.findByUserId(userId.get());
        } else if (postId.isPresent()) {
            return  commentRepository.findByPostId(postId.get());
        } else if (postId.isPresent() && userId.isPresent()) {
            return commentRepository.findByUserIdAndPostId(userId.get(),postId.get());
        }else{
            return commentRepository.findAll();
        }
    }

    public Comment getOneCommentById(Long commentId){
        return commentRepository.findById(commentId).orElse(null);
    }

    public Comment createOneComment(CommentCreateRequest request){
        User user = userService.getOneUser(request.getUserId());
        Post post = postService.getOnePostById(request.getPostId());
        if(user!=null && post!=null){
            Comment newComment = new Comment();
            newComment.setId(request.getId());
            newComment.setPost(post);
            newComment.setUser(user);
            newComment.setText(request.getText());
            return commentRepository.save(newComment);
        }else
            return null;
    }

    public Comment updateOneComment(Long commmentId, CommentUpdateRequest request){
        Optional<Comment> comment = commentRepository.findById(commmentId);
        if(comment.isPresent()){
            Comment updatedComment = comment.get();
            updatedComment.setText(request.getText());
            return commentRepository.save(updatedComment);
        }else
            return null;

    }

    public void deleteOneComment(Long commentId){
        commentRepository.deleteById(commentId);
    }


}
