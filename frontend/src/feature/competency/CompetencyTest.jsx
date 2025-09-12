import { Card } from "react-bootstrap";
import * as PropTypes from "prop-types";

function CardContent(props) {
  return null;
}

CardContent.propTypes = { children: PropTypes.node };

export function CompetencyTest() {
  const competencies = [
    {
      title: "자기 주도 역량",
      definition:
        "스스로 학습하고 문제를 해결하며, 목표를 설정하고 성취하는 능력.",
      sub: ["자기 관리", "문제 해결", "학습 능력"],
      images: ["/images/self1.png", "/images/self2.png"],
    },
    {
      title: "협업 역량",
      definition:
        "다양한 사람들과 소통하고 협력하여 공동의 목표를 이루는 능력.",
      sub: ["의사소통", "팀워크", "갈등 해결"],
      images: ["/images/team1.png", "/images/team2.png"],
    },
    {
      title: "창의 융합 역량",
      definition:
        "새로운 아이디어를 창출하고, 여러 지식을 융합하여 가치를 만들어내는 능력.",
      sub: ["창의적 사고", "융합적 사고", "실행력"],
      images: ["/images/creative1.png", "/images/creative2.png"],
    },
  ];
  return (
    <>
      <div className="grid gap-6 md:grid-cols-3">
        {competencies.map((comp, idx) => (
          <Card key={idx} className="shadow-lg rounded-2xl p-4">
            <CardContent>
              <h2 className="text-xl font-bold mb-2">{comp.title}</h2>
              <p className="text-sm text-gray-600 mb-3">{comp.definition}</p>

              <ul className="list-disc list-inside text-gray-700 mb-4">
                {comp.sub.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>

              {/* 이미지 두 장 배치 */}
              <div className="flex gap-2">
                {comp.images.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`${comp.title} ${i + 1}`}
                    className="w-1/2 h-32 object-cover rounded-lg"
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
