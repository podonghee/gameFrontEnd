package com.podong.game.gamefrontend.game.gm006.controller;
import com.podong.game.gamefrontend.game.gm006.service.Gm006Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import javax.servlet.http.HttpServletRequest;
import java.util.Calendar;

/**
 * 게임랭킹을 뿌려주는 페이지
 * Author : Po dong hee
 * Date : 2021.05.14
 */
@Controller
public class Gm006Controller {
    @Autowired
    private Gm006Service gm006Service;

    @RequestMapping(value="/gm/gm006/gm006", method= RequestMethod.GET)
    public String view(ModelMap model , HttpServletRequest reqeust) {
        paramAnView(reqeust,model);
        return "/gm/gm006/gm006";
    }
    @RequestMapping(value="/gm/gm006/gm006/flgch", method= RequestMethod.GET)
    public String view2(ModelMap model , HttpServletRequest reqeust) {
        paramAnView(reqeust,model);
        return "/gm/gm006/gm006 :: article_type";
    }
    private void paramAnView(HttpServletRequest reqeust,ModelMap model){
        String rankYear = reqeust.getParameter("Year");
        if(null == rankYear || "".equals(rankYear)){
            Calendar c = Calendar.getInstance(); //객체 생성 및 현재 일시분초...셋팅
            rankYear = String.valueOf(c.get(Calendar.YEAR));
        }
        model.addAttribute("rankYear",gm006Service.getRankYear());
        model.addAttribute("rankOneWeek",gm006Service.getRankOneWeek(rankYear));
    }
}
