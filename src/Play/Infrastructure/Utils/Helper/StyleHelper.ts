export default class StyleHelper
{
    public static AddStyle(css: string)
    {
        //var css = 'h1 { background: red; }',
        var head = document.head || document.getElementsByTagName('head')[0];
        var style = document.createElement('style');

        head.appendChild(style);

        style.appendChild(document.createTextNode(css));
    }
}