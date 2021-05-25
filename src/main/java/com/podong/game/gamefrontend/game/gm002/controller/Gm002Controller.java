package com.podong.game.gamefrontend.game.gm002.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletRequest;


/**
 * 업체페이지
 * Author : Po dong hee
 * Date : 2021.05.14
 */
@Controller
public class Gm002Controller {
    @RequestMapping(value="/gm/gm002/gm002")
    public String view(Model model){
        return "gm/gm002/gm002";
    }

    @RequestMapping(value="/gm/gm002/gm002-01")
    public String view2(HttpServletRequest request, Model model){
        String gameCompanyCid = request.getParameter("gameCompanyCid");
        model.addAttribute("gameCompanyCid",gameCompanyCid);
        return "gm/gm002/gm002-01";
    }
}
