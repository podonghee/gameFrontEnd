package com.podong.game.gamefrontend.game.gm004.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
@Controller
public class Gm004Controller {
    @RequestMapping(value="/gm/gm004/gm004", method= RequestMethod.GET)
    public String view(Model model){
        return "gm/gm004/gm004";
    }
}
