package com.podong.game.gamefrontend.game.gm006.service;

import com.podong.game.gamefrontend.game.gm006.dao.Gm006Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class Gm006Service {

    @Autowired
    private Gm006Mapper gm006Mapper;

    public Object getRankYear(){

        return gm006Mapper.getRankYear();
    }
    public Object getRankOneWeek(String rankYear){
        return gm006Mapper.getRankOneWeek(rankYear);
    }
}
