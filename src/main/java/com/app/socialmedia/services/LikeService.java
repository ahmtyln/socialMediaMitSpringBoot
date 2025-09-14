package com.app.socialmedia.services;

import com.app.socialmedia.DTOs.LikeCreateRequest;
import com.app.socialmedia.entities.Like;
import com.app.socialmedia.entities.Post;
import com.app.socialmedia.entities.User;
import com.app.socialmedia.repository.LikeRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LikeService {
    LikeRepository likeRepository;
    UserService userService;
    PostService postService;

    public LikeService(LikeRepository likeRepository, UserService userService, PostService postService){
        this.likeRepository = likeRepository;
        this.userService = userService;
        this.postService = postService;
    }

    public List<Like> getAllLikes(Optional<Long> userId,Optional<Long> postId){
        if (userId.isPresent()) {
            return likeRepository.findByUserId(userId.get());
        } else if (postId.isPresent()) {
            return likeRepository.findByPostId(postId.get());
        } else if (userId.isPresent() && postId.isPresent()) {
            return likeRepository.findByUserIdAndPostId(userId.get(), postId.get());
        } else {
            return likeRepository.findAll();
        }
    }

    public Like getOneLikeWithId(Long likeId){
        return likeRepository.findById(likeId).orElse(null);
    }

    public Like createOneLike(LikeCreateRequest request){
        if(request != null){
            User user = userService.getOneUser(request.getUserId());
            Post post = postService.getOnePostById(request.getPostId());
            Like like = new Like();
            like.setId(request.getId());
            like.setUser(user);
            like.setPost(post);
            return likeRepository.save(like);
        }else return null;
    }
    public void deleteOneLikeWithId(Long likeId){
        likeRepository.deleteById(likeId);
    }


}
