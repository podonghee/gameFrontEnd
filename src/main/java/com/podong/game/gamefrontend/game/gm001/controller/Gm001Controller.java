package com.podong.game.gamefrontend.game.gm001.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;


/**
 * 메인페이지
 * Author : Po dong hee
 * Date : 2021.05.14
 */
@Controller
public class Gm001Controller {
    @RequestMapping(value="/", method= RequestMethod.GET)
    public String view(Model model){
        return "gm/gm001/gm001";
    }
//    @RequestMapping(value="/", method= RequestMethod.GET)
//    public String view(Model model){
//        return "gm/test/test001";
//    }
}
