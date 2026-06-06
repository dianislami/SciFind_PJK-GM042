import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import React from "react";

export type ThreeDMarqueeProps = {
  images: string[];
  className?: string;
};

export const ThreeDMarquee = ({ images, className }: ThreeDMarqueeProps) => {
  // Split the images array into 5 equal parts
  const chunkSize: number = Math.ceil(images.length / 7);
  const chunks: string[][] = Array.from({ length: 7 }, (_, colIndex) => {
    const start: number = colIndex * chunkSize;
    return images.slice(start, start + chunkSize);
  });

  return (
    <div
      className={cn(
        "mx-auto block h-[600px] overflow-hidden max-sm:h-100",
        className,
      )}
    >
      <div className="flex size-full items-center justify-center">
        <div className="size-[1920px] shrink-0 scale-50 sm:scale-75 lg:scale-100">
          <div
            style={{
              transform: "rotateX(55deg) rotateY(0deg) rotateZ(-45deg)",
            }}
            className="relative top-80 right-[80%] lg:right-[78%] grid size-full origin-top-left grid-cols-7 gap-8 transform-3d"
          >
            {chunks.map((subarray, colIndex) => (
              <motion.div
                animate={{ y: colIndex % 2 === 0 ? 100 : -100 }}
                transition={{
                  duration: colIndex % 2 === 0 ? 10 : 15,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                key={colIndex + "marquee"}
                className="flex flex-col items-center gap-4"
              >
                <GridLineVertical className="-left-4" offset="60px" />
                {subarray.map((image, imageIndex) => (
                  <div className="relative" key={imageIndex + image}>
                    <GridLineHorizontal className="-top-4" offset="16px" />
                    <motion.img
                      whileHover={{
                        y: -10,
                      }}
                      transition={{
                        duration: 0.3,
                        ease: "easeInOut",
                      }}
                      key={imageIndex + image}
                      src={image}
                      alt={`Image ${imageIndex + 1}`}
                      // Use portrait aspect ratio (width/height < 1)
                      className="aspect-[300/570] rounded-lg object-cover ring ring-gray-950/5 hover:shadow-2xl hover:cursor-pointer"
                      width={300}
                      height={570}
                    />

                    {/* Dark overlay for better text readability */}
                    <div className="absolute inset-0 bg-black/40 z-10 hover:cursor-pointer"></div>
                  </div>
                ))}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a14] via-transparent to-transparent z-10 hover:cursor-pointer"></div>
    </div>
  );
};

export type GridLineHorizontalProps = {
  className?: string;
  offset?: string;
};

const GridLineHorizontal = ({ className, offset }: GridLineHorizontalProps) => {
  return (
    <div
      style={
        {
          "--background": "#ffffff",
          "--color": "rgba(0, 0, 0, 0.2)",
          "--height": "1px",
          "--width": "4px",
          "--fade-stop": "90%",
          // default offset reduced to better match smaller images
          "--offset": offset || "40px", //-100px if you want to keep the line inside
          "--color-dark": "rgba(255, 255, 255, 0.2)",
          maskComposite: "exclude",
        } as React.CSSProperties
      }
      className={cn(
        "absolute left-[calc(var(--offset)/2*-1)] h-[var(--height)] w-[calc(100%+var(--offset))]",
        "bg-[linear-gradient(to_right,var(--color),var(--color)_50%,transparent_0,transparent)]",
        "[background-size:var(--width)_var(--height)]",
        "[mask:linear-gradient(to_left,var(--background)_var(--fade-stop),transparent),_linear-gradient(to_right,var(--background)_var(--fade-stop),transparent),_linear-gradient(black,black)]",
        "[mask-composite:exclude]",
        "z-30",
        "dark:bg-[linear-gradient(to_right,var(--color-dark),var(--color-dark)_50%,transparent_0,transparent)]",
        className,
      )}
    ></div>
  );
};

export type GridLineVerticalProps = {
  className?: string;
  offset?: string;
};

const GridLineVertical = ({ className, offset }: GridLineVerticalProps) => {
  return (
    <div
      style={
        {
          "--background": "#ffffff",
          "--color": "rgba(0, 0, 0, 0.2)",
          "--height": "5px",
          "--width": "1px",
          "--fade-stop": "90%",
          // default offset reduced to better match column spacing
          "--offset": offset || "80px", //-100px if you want to keep the line inside
          "--color-dark": "rgba(255, 255, 255, 0.2)",
          maskComposite: "exclude",
        } as React.CSSProperties
      }
      className={cn(
        "absolute top-[calc(var(--offset)/2*-1)] h-[calc(100%+var(--offset))] w-[var(--width)]",
        "bg-[linear-gradient(to_bottom,var(--color),var(--color)_50%,transparent_0,transparent)]",
        "[background-size:var(--width)_var(--height)]",
        "[mask:linear-gradient(to_top,var(--background)_var(--fade-stop),transparent),_linear-gradient(to_bottom,var(--background)_var(--fade-stop),transparent),_linear-gradient(black,black)]",
        "[mask-composite:exclude]",
        "z-30",
        "dark:bg-[linear-gradient(to_bottom,var(--color-dark),var(--color-dark)_50%,transparent_0,transparent)]",
        className,
      )}
    ></div>
  );
};

export { GridLineHorizontal, GridLineVertical };