package com.podong.game.gamefrontend.game.gm003.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletRequest;


/**
 * 공략 페이지
 * Author : Po dong hee
 * Date : 2021.05.22
 */
@Controller
public class Gm003Controller {
    @RequestMapping(value="/gm/gm003/gm003")
    public String view(Model model){
        return "gm/gm003/gm003";
    }
}
