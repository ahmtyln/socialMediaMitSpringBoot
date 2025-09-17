package com.app.socialmedia.services;

import com.app.socialmedia.DTOs.LikeCreateRequest;
import com.app.socialmedia.DTOs.LikeResponse;
import com.app.socialmedia.entities.Like;
import com.app.socialmedia.entities.Post;
import com.app.socialmedia.entities.User;
import com.app.socialmedia.repository.LikeRepository;
import com.app.socialmedia.repository.PostRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class LikeService {

    private final LikeRepository likeRepository;
    private final UserService userService;
    private final PostRepository postRepository;

    public LikeService(LikeRepository likeRepository,
                       UserService userService,
                       PostRepository postRepository) {
        this.likeRepository = likeRepository;
        this.userService = userService;
        this.postRepository = postRepository;
    }

    public List<LikeResponse> getAllLikes(Optional<Long> userId, Optional<Long> postId) {
        List<Like> list;

        if (userId.isPresent() && postId.isPresent()) {
            list = likeRepository.findByUserIdAndPostId(userId.get(), postId.get());
        } else if (userId.isPresent()) {
            list = likeRepository.findByUserId(userId.get());
        } else if (postId.isPresent()) {
            list = likeRepository.findByPostId(postId.get());
        } else {
            list = likeRepository.findAll();
        }

        return list.stream().map(like -> new LikeResponse(like)).collect(Collectors.toList());
    }

    public Like getOneLikeWithId(Long likeId) {
        return likeRepository.findById(likeId).orElse(null);
    }

    public Like createOneLike(LikeCreateRequest request) {
        if (request == null) return null;

        User user = userService.getOneUser(request.getUserId());
        Post post = postRepository.findById(request.getPostId()).orElse(null);

        if (user == null || post == null) return null;

        Like like = new Like();
        like.setId(request.getId());
        like.setUser(user);
        like.setPost(post);
        return likeRepository.save(like);
    }

    public void deleteOneLikeWithId(Long likeId) {
        likeRepository.deleteById(likeId);
    }
}
