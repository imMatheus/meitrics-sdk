type LogType = 'info' | 'error' | 'warning' | 'info' | 'other';

interface Options {
    publicKey: string;
    secretKey: string;
}
type LogFunction = (args: {
    url?: string;
    message?: string;
}) => void;
declare function Meitrics(options: Options): Record<LogType, LogFunction>;

export { Options, Meitrics as default };
