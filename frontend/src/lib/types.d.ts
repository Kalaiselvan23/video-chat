declare global {
    namespace JSX {
        interface IntrinsicElements {
            video: React.DetailedHTMLProps<React.VideoHTMLAttributes<HTMLVideoElement> & {
                srcObject?: MediaStream;
            }, HTMLVideoElement>;
        }
    }
}
