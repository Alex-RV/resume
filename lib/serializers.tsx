import { useTheme } from 'next-themes';

export const serializers = {
    
    types: {
      block: props => {
        const { resolvedTheme, setTheme } = useTheme();
        switch (props.node.style) {
          case 'h1':
            return <h1 className="text-4xl my-4 font-bold text-black dark:text-white">{props.children}</h1>;
          case 'h2':
            return <h2 className="text-3xl my-4 font-bold text-black dark:text-white">{props.children}</h2>;
          case 'h3':
            return <h3 className="text-2xl my-4 font-bold text-black dark:text-white">{props.children}</h3>;
          case 'h4':
            return <h4 className="text-2xl my-4 font-bold text-black dark:text-white">{props.children}</h4>;
          case 'li':
            return <li style={{
                              listStyleType: "disc",
                              marginLeft: "1rem",
                              marginTop: "2rem",
                            }} className="text-2xl my-4 list-disc text-black dark:text-white">{props.children}</li>;
          case 'blockquote':
            return <blockquote
            style={{
                              fontStyle: "italic",
                              fontWeight: 500,
                              borderLeftWidth: "4px",
                              borderColor: "gray",
                              padding: "1rem",
                              backgroundColor: resolvedTheme == "dark" ? "#343434" : "#DCDCDC",
                              fontSize: "1rem",
                            }}
             className="border-l-4 my-4 border-gray-700 bg-[#DCDCDC] dark:bg-[#343434]  pl-4">{props.children}</blockquote>;
             
          default:
            return <p className="my-4">{props.children}</p>;
        }
      },
    },
    
    marks: {
        link: (props) => {
          return <a
                      href={props.mark.href}
                      style={{
                        color: "#2ea6ff",
                        listStyleType: "disc",
                        marginTop: "2rem",
                        textDecoration: "underline",
                      }}
                      className="text-[#2ea6ff] my-4 underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {props.children}
                    </a>
        }
      },
    
  }