package com.podong.game.gamefrontend.game.gm006.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;


/**
 * 게임랭킹을 뿌려주는 페이지
 * Author : Po dong hee
 * Date : 2021.05.14
 */
@Controller
public class GM006Controller {
    @RequestMapping(value="/gm/gm006/gm006", method= RequestMethod.GET)
    public String view(ModelMap model) {
        return "/gm/gm006/gm006";
    }

}
