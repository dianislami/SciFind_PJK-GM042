import { useEffect } from "react";
import { motion, stagger, useAnimate } from "framer-motion";

interface TextGenerateEffectProps {
  words: string;
  className?: string;
  filter?: boolean;
  duration?: number;
  initialDelay?: number;
}

export const TextGenerateEffect = ({
  words,
  className,
  filter = true,
  duration = 0.5,
  initialDelay = 0,
}: TextGenerateEffectProps): React.ReactElement => {
  const [scope, animate] = useAnimate();
  const wordsArray: string[] = words.split(" ");
  
  useEffect(() => {
    const timer = setTimeout(() => {
      animate(
        "span",
        {
          opacity: 1,
          filter: filter ? "blur(0px)" : "none",
        },
        {
          duration: duration || 1,
          delay: stagger(0.2),
        }
      );
    }, initialDelay * 1000);
    
    return () => clearTimeout(timer);
  }, [animate, duration, filter, initialDelay]);

  const renderWords = (): React.ReactElement => {
    return (
      <motion.div ref={scope} className={className}>
        {wordsArray.map((word, idx) => {
          return (
            <motion.span
              key={word + idx}
              className={className}
              style={{
                filter: filter ? "blur(10px)" : "none",
                opacity: 0,
              }}
            >
              {word}{" "}
            </motion.span>
          );
        })}
      </motion.div>
    );
  };

  return <>{renderWords()}</>;
};
