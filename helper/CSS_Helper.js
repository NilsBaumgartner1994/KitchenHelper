const css = require('css');

export class CSS_Helper{

    static parseCssToSelectorMap(custom_css) {
        let parsed_css = css.parse(custom_css);
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