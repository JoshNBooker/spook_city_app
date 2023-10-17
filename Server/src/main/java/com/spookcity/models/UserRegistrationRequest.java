package com.spookcity.models;

public class UserRegistrationRequest {
    private String joinUsername;
    private String joinPassword;
    private String profileImage;

    public String getJoinUsername() {
        return joinUsername;
    }

    public String getJoinPassword() {
        return joinPassword;
    }

    public String getProfileImage() {
        return profileImage;
    }

    public void setJoinUsername(String joinUsername) {
        this.joinUsername = joinUsername;
    }

    public void setJoinPassword(String joinPassword) {
        this.joinPassword = joinPassword;
    }

    public void setProfileImage(String profileImage) {
        this.profileImage = profileImage;
    }
}
