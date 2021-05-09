package com.podong.game.gamefrontend.game.gm000.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletRequest;

@Controller
@RequestMapping("/game")
public class GameController {

    @RequestMapping(value = "gm000", method = RequestMethod.GET)
    public String detail(HttpServletRequest request, Model model){
        String gameId = request.getParameter("gameId");
        String gmTabNm = request.getParameter("gmTabNm");

        model.addAttribute("gameId",gameId);
        model.addAttribute("gmTabNm",gmTabNm);

        return "gm/gm000/gm000";
    }

}
