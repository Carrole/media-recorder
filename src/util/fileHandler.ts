export const downloadFile = (url:string, fileName:string) => {
    const a = document.createElement('a');
    a.href = url;
    a.download = `${fileName}.webm`;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }, 100);
};