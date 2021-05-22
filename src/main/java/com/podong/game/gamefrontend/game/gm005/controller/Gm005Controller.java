package com.podong.game.gamefrontend.game.gm005.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class Gm005Controller {
    @RequestMapping(value="/gm/gm005/gm005", method= RequestMethod.GET)
    public String view(Model model){
        return "gm/gm005/gm005";
    }
}
