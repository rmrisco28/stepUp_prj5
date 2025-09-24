import React from "react";

export const StepUpBanner = () => {
  const styles = {
    banner: {
      width: "100%",
      height: "400px",
      background: "linear-gradient(135deg, #f0f0f0 0%, #e8e8e8 100%)",
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 60px",
      boxSizing: "border-box",
      borderRadius: "15px",
      overflow: "hidden",
    },
    textContent: {
      flex: 1,
      zIndex: 2,
    },
    universityName: {
      color: "#c0c0c0",
      fontSize: "24px",
      fontWeight: "300",
      marginBottom: "20px",
      letterSpacing: "2px",
      fontFamily: "Arial, sans-serif",
    },
    mainTitle: {
      color: "#2c2c2c",
      fontSize: "48px",
      fontWeight: "bold",
      marginBottom: "30px",
      lineHeight: "1.2",
      fontFamily: "Arial, sans-serif",
    },
    subtitle: {
      color: "#4a4a4a",
      fontSize: "20px",
      fontWeight: "normal",
      position: "relative",
      fontFamily: "Arial, sans-serif",
    },
    underline: {
      position: "absolute",
      bottom: "-8px",
      left: "0",
      width: "160px",
      height: "4px",
      background: "linear-gradient(90deg, #ff6b6b, #ff8e8e)",
      borderRadius: "2px",
    },
    logoContainer: {
      flex: "0 0 300px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 2,
    },
    stepupLogo: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      background: "linear-gradient(135deg, #4CAF50 0%, #45a049 100%)",
      padding: "40px",
      borderRadius: "20px",
      boxShadow: "0 15px 35px rgba(76, 175, 80, 0.3)",
      transform: "perspective(1000px) rotateY(-5deg)",
      transition: "transform 0.3s ease, box-shadow 0.3s ease",
      animation: "float 3s ease-in-out infinite",
    },
    stepIcon: {
      display: "flex",
      alignItems: "flex-end",
      marginBottom: "15px",
    },
    stepBar: {
      background: "#66BB6A",
      marginRight: "3px",
      borderRadius: "2px",
      transition: "all 0.3s ease",
    },
    logoText: {
      color: "#2E7D32",
      fontSize: "36px",
      fontWeight: "bold",
      marginBottom: "8px",
      textShadow: "0 2px 4px rgba(0,0,0,0.1)",
      fontFamily: "Arial, sans-serif",
    },
    logoSubtext: {
      color: "#1B5E20",
      fontSize: "14px",
      fontWeight: "500",
      letterSpacing: "1px",
      lineHeight: "1.3",
      fontFamily: "Arial, sans-serif",
    },
    backgroundPattern: {
      position: "absolute",
      top: "0",
      left: "0",
      width: "100%",
      height: "100%",
      opacity: "0.05",
      backgroundImage: `
        radial-gradient(circle at 25% 25%, #4CAF50 2px, transparent 2px),
        radial-gradient(circle at 75% 75%, #4CAF50 1px, transparent 1px)
      `,
      backgroundSize: "50px 50px",
      zIndex: 1,
    },
  };

  const handleLogoHover = (e) => {
    e.currentTarget.style.transform =
      "perspective(1000px) rotateY(0deg) translateY(-5px)";
    e.currentTarget.style.boxShadow = "0 20px 45px rgba(76, 175, 80, 0.4)";

    // step bars 색상 변경
    const stepBars = e.currentTarget.querySelectorAll(".step-bar");
    stepBars.forEach((bar) => {
      bar.style.background = "#A5D6A7";
      bar.style.transform = "scaleY(1.1)";
    });
  };

  const handleLogoLeave = (e) => {
    e.currentTarget.style.transform = "perspective(1000px) rotateY(-5deg)";
    e.currentTarget.style.boxShadow = "0 15px 35px rgba(76, 175, 80, 0.3)";

    // step bars 원래 색상으로 복원
    const stepBars = e.currentTarget.querySelectorAll(".step-bar");
    stepBars.forEach((bar) => {
      bar.style.background = "#66BB6A";
      bar.style.transform = "scaleY(1)";
    });
  };

  return (
    <>
      <style>
        {`
          @keyframes float {
            0%, 100% { transform: perspective(1000px) rotateY(-5deg) translateY(0px); }
            50% { transform: perspective(1000px) rotateY(-5deg) translateY(-10px); }
          }
          
          @media (max-width: 768px) {
            .stepup-banner {
              flex-direction: column !important;
              height: auto !important;
              padding: 40px 20px !important;
              text-align: center;
            }
            
            .stepup-banner .main-title {
              font-size: 36px !important;
            }
            
            .stepup-banner .logo-container {
              flex: none !important;
              margin-top: 30px;
            }
            
            .stepup-banner .stepup-logo {
              transform: none !important;
              animation: none !important;
            }
          }
        `}
      </style>
      <div style={styles.banner} className="stepup-banner">
        <div style={styles.backgroundPattern}></div>

        <div style={styles.textContent}>
          <div style={styles.universityName}>UNIVERSITY EXTRACURRICULAR</div>
          <div style={styles.mainTitle} className="main-title">
            stepUp 비교과 시스템
          </div>
          <div style={styles.subtitle}>
            여러분만의 비교과를 디자인 해보세요!
            <div style={styles.underline}></div>
          </div>
        </div>

        <div style={styles.logoContainer} className="logo-container">
          <div
            style={styles.stepupLogo}
            className="stepup-logo"
            onMouseEnter={handleLogoHover}
            onMouseLeave={handleLogoLeave}
          >
            <div style={styles.stepIcon}>
              <div
                className="step-bar"
                style={{ ...styles.stepBar, width: "12px", height: "20px" }}
              ></div>
              <div
                className="step-bar"
                style={{ ...styles.stepBar, width: "12px", height: "35px" }}
              ></div>
              <div
                className="step-bar"
                style={{ ...styles.stepBar, width: "12px", height: "50px" }}
              ></div>
              <div
                className="step-bar"
                style={{ ...styles.stepBar, width: "12px", height: "65px" }}
              ></div>
            </div>
            <div style={styles.logoText}>stepUp</div>
            <div style={styles.logoSubtext}>
              UNIVERSITY
              <br />
              EXTRACURRICULAR
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
