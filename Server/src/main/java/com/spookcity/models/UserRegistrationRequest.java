package com.spookcity.models;

public class UserRegistrationRequest {
    private String joinUsername;
    private String joinPassword;
    private int profileImage;

    public String getJoinUsername() {
        return joinUsername;
    }

    public String getJoinPassword() {
        return joinPassword;
    }

    public int getProfileImage() {
        return profileImage;
    }

    public void setJoinUsername(String joinUsername) {
        this.joinUsername = joinUsername;
    }

    public void setJoinPassword(String joinPassword) {
        this.joinPassword = joinPassword;
    }

    public void setProfileImage(int profileImage) {
        this.profileImage = profileImage;
    }
}
