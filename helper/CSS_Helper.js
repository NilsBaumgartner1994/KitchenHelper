export class CSS_Helper{

    static pxToPt(px){
        return px*0.75; //https://www.w3.org/TR/css3-values/#absolute-lengths
    }

    static parseCssToSelectorMap(custom_css) {
        console.log(custom_css)
        let parsed_css = {};
        let selectorsMap = {};
        let rules = parsed_css?.stylesheet?.rules || [];
        for(let rule of rules){
            let selectors = rule?.selectors || [];
            let declarations = rule?.declarations;
            for(let selector of selectors){
                let selectorMap = selectorsMap[selector] || {};
                for(let declaration of declarations){
                    let value = declaration.value;
                    value = value.replaceAll(" !important", "");
                    selectorMap[declaration.property] = value;
                }
                selectorsMap[selector] = selectorMap;
            }
        }

        return selectorsMap;
    }

}