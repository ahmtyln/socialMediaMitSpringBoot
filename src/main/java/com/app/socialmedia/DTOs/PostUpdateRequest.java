package com.app.socialmedia.DTOs;

import lombok.Data;

@Data
public class PostUpdateRequest {
    private String text;
    private String title;
}
