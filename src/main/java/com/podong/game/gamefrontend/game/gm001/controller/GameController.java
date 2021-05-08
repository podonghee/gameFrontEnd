package com.podong.game.gamefrontend.game.gm001.controller;

import org.springframework.http.HttpRequest;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletRequest;

@Controller
@RequestMapping("/game")
public class GameController {

    @RequestMapping(value = "gm001", method = RequestMethod.GET)
    public String detail(HttpServletRequest request, Model model){
        String gameId = request.getParameter("gameId");
        model.addAttribute("gameId",gameId);

        return "gm/gm001/gm001";
    }

}
