package com.podong.game.gamefrontend.game.gm004.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;

/**
 * 스크린샷 페이지
 * Author : Po dong hee
 * Date : 2021.05.21
 */
@Controller
public class Gm004Controller {
    @RequestMapping(value="/gm/gm004/gm004")
    public String view(Model model){
        return "gm/gm004/gm004";
    }
    @RequestMapping(value="/gm/gm004/gm004-01")
    public String view2(HttpServletRequest request, Model model){
        String gameId = request.getParameter("gameId");
        String gameSshotId = request.getParameter("gameSshotId");

        model.addAttribute("gameId",gameId);
        model.addAttribute("gameSshotId",gameSshotId);
        return "gm/gm004/gm004-01";
    }
}