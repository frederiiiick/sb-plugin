const initSBPlugin = (element_id) => {
    const element = document.getElementById(element_id);
    const mls_number = element.getAttribute("data-mls-number");
    const mls_source = element.getAttribute("data-mls-source");

    if (element && mls_number && mls_source) {
        const link = document.createElement("link");
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("type", "text/css");
        link.setAttribute("href", "https://cdn.jsdelivr.net/npm/font-proxima-nova@1.0.1/style.min.css");
        element.appendChild(link);
        
        const size = element.getAttribute("data-size");
        const title = element.getAttribute("data-title");
        const extra_css = element.getAttribute("data-extra-css");
        plugin_button = document.createElement("button");
        plugin_button.innerHTML = title ? title : "Showing Bee";
        plugin_button = sbButton(plugin_button, size ? size : "normal", extra_css);
    
        plugin_button.addEventListener("click", () => onPluginClick(element, mls_number, mls_source));
    
        element.appendChild(plugin_button);
    } else {
        console.log('missing mls number!')
    }
}

const sbButton = (element, size, extra_css) => {
    element.style.border = "none";
    element.style.borderRadius = "10px";
    element.style.color = "white";
    element.style.cursor = "pointer";
    element.style.fontWeight = "700";
    element.style.fontFamily = "'Proxima Nova', sans-serif";
    element.style.fontSize = "20px";
    element.style.padding = "0 40px";
    element.style.background = "transparent linear-gradient(103deg, #FAC91F 0%, #F8A728 100%) 0% 0% no-repeat padding-box";

    if (size === "normal") element.style.height = "50px";
    if (size === "large") element.style.height = "60px";
    if (size === "small") {
        element.style.fontWeight = "500";
        element.style.fontSize = "14px";
        element.style.borderRadius = "5px";
        element.style.height = "40px";
        element.style.padding = "0 30px";
    }

    element.style.cssText += extra_css;

    element.addEventListener("mouseenter", (event) => {
        element.style.background = '#FAC91F'
    });
    
    element.addEventListener("mouseleave", (event) => {
        element.style.background = "transparent linear-gradient(103deg, #FAC91F 0%, #F8A728 100%) 0% 0% no-repeat padding-box";
        if (extra_css && extra_css.includes('background')) {
            element.style.cssText += extra_css;
        }
    });

    return element
}


const onPluginClick = (element, mls_number, mls_source) => {
    const agent_info = element.getAttribute("data-agent-info");
    const win_type = element.getAttribute("data-window") ? element.getAttribute("data-window") : 'popup';
    
    let url = 'https://www.showingbee.com';
    
    if (element.getAttribute("data-env")) {
        if (element.getAttribute("data-window") === 'dev') {
            url = 'http://localhost:3000';
        } else if (element.getAttribute("data-window") === 'prod') {
            url = 'https://www.showingbee.com';
        }
    }

    if (agent_info) {
        let params = [];

        if (JSON.parse(agent_info).email) {
            params.push(`agent_email=${JSON.parse(agent_info).email}`)
        }
        if (JSON.parse(agent_info).first_name) {
            params.push(`agent_first_name=${JSON.parse(agent_info).first_name}`)
        }
        if (JSON.parse(agent_info).last_name) {
            params.push(`agent_last_name=${JSON.parse(agent_info).last_name}`)
        }
        if (JSON.parse(agent_info).phone_number) {
            params.push(`agent_phone_number=${JSON.parse(agent_info).phone_number.replace("+1","")}`)
        }
        if (JSON.parse(agent_info).company) {
            params.push(`agent_company=${JSON.parse(agent_info).company}`)
        }
        if (win_type === 'tab') {
            window.open(`${url}/listing/${mls_source}/${mls_number}/request-calendar/?${params.join('&')}`, '_blank');
        } else if (win_type === 'popup') {
            window.open(`${url}/listing/${mls_source}/${mls_number}/request-calendar/?${params.join('&')}`,'popup_form', 'height=833px,width=1024px');
        }
    } else {
        alert('Agent information must be provided!')
    }
}