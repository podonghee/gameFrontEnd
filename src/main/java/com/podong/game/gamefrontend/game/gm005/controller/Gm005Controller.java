package com.podong.game.gamefrontend.game.gm005.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
/**
 * 동영상 페이지
 * Author : Po dong hee
 * Date : 2021.05.21
 */
@Controller
public class Gm005Controller {
    @RequestMapping(value="/gm/gm005/gm005")
    public String view(Model model){
        return "gm/gm005/gm005";
    }
}
