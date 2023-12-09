import ContentLoader from "react-content-loader";

const Sceleton = (props) => {
    return (
        <ContentLoader 
            speed={2}
            width={300}
            height={468}
            viewBox="0 0 300 468"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
            {...props}>
            <rect x="0" y="0" rx="10" ry="10" width="300" height="230" /> 
            <rect x="0" y="250" rx="10" ry="10" width="300" height="40" /> 
            <rect x="157" y="285" rx="0" ry="0" width="1" height="0" /> 
            <rect x="0" y="305" rx="10" ry="10" width="300" height="78" /> 
            <rect x="160" y="405" rx="25" ry="25" width="140" height="45" /> 
            <rect x="20" y="415" rx="0" ry="0" width="60" height="0" /> 
            <rect x="0" y="415" rx="10" ry="10" width="128" height="30" />
        </ContentLoader>
    )
}

export default Sceleton;