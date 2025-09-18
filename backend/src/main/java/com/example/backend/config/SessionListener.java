package com.example.backend.config;

import com.example.backend.member.repository.MemberRepository;
import jakarta.servlet.http.HttpSessionEvent;
import jakarta.servlet.http.HttpSessionListener;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class SessionListener implements HttpSessionListener {
    private final MemberRepository memberRepository;

    @Override
    public void sessionDestroyed(HttpSessionEvent se) {
        String loginId = (String) se.getSession().getAttribute("loginId");
        if (loginId != null) {
            memberRepository.findByLoginId(loginId).ifPresent(member -> {
                member.setUserYn(0);
                memberRepository.save(member);
            });
        }
    }
}
