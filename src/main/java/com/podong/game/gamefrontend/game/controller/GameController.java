package com.podong.game.gamefrontend.game.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/game")
public class GameController {

    @RequestMapping("/detail")
    public String detail(){
        return "gm/gmdetail/gamedetail";
    }

}
