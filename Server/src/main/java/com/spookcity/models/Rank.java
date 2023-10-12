package com.spookcity.models;

public enum Rank {
    NOVICE (0),
    MEDIUM (1000),
    SEANCEMASTER (3000);

    Rank(int points) {
    }
//
//    Rank(int rankNum) {
//    }
//


    public static Rank getRank(int points) {
        if (points < 1000) {
            return NOVICE;
        } else if (points < 3000) {
            return MEDIUM;
        } else {
            return SEANCEMASTER;
        }
    }

    public int getPoints() {
        return switch (this) {
            case NOVICE -> 0;
            case MEDIUM -> 1000;
            case SEANCEMASTER -> 3000;
            default -> 0;
        };
    }


}
