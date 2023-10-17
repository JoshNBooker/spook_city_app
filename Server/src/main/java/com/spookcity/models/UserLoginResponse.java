package com.spookcity.models;

public class UserLoginResponse {
    private boolean success;
    private User user;

    public UserLoginResponse(boolean success, User user){
        this.success = success;
        this.user = user;
    }

    public boolean isSuccess() {
        return success;
    }

    public User getUser() {
        return user;
    }
}
