package com.podong.game.gamefrontend.game.gm006.dao;

import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface Gm006Mapper {
    List<String> getRankYear();

    List<String> getRankOneWeek(String rankYear);
}
