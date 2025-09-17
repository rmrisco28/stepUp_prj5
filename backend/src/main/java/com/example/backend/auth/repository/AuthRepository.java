package com.example.backend.auth.repository;

import com.example.backend.auth.entity.Auth;
import com.example.backend.auth.entity.AuthId;
import com.example.backend.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AuthRepository extends JpaRepository<Auth, AuthId> {
    // _Id 없으면 객체 자체를 받는거고
    List<Auth> findByMemberSeq(Member memberSeq);

    // 이렇게 해야 memberSeq를 넣어서 찾아서 이제 얘를 통해서 authName을 가져오는 것.
    // 보면 알겠지만 list로 받아오니까 어떤 권한 가져올지는 내가 서비스 코드에서 수정하면됨
    List<Auth> findByMemberSeq_Id(Integer memberSeqId);
}