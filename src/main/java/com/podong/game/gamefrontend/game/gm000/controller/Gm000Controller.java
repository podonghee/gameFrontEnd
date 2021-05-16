package com.podong.game.gamefrontend.game.gm000.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletRequest;

/**
 * 상세 페이지에 뿌려줄 공통 페이지.
 * Author : Po dong hee
 * Date : 2021.05.14
 */
@Controller
public class Gm000Controller {
    @RequestMapping(value="/gm/gm000/gm000", method= {RequestMethod.GET, RequestMethod.POST})
    public String view(HttpServletRequest request, Model model){
        String gameId = request.getParameter("gameId");
        String gmTabNm = request.getParameter("gmTabNm");
        model.addAttribute("gameId",gameId);
        model.addAttribute("gmTabNm",gmTabNm);
        return "gm/gm000/gm000";
    }

}
