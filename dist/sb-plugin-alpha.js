const initSBPlugin = (element_id) => {
    const element = document.getElementById(element_id);
    const mls_number = element.getAttribute("data-mls-number");

    if (mls_number) {
        const link = document.createElement("link");
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("type", "text/css");
        link.setAttribute("href", "https://cdn.jsdelivr.net/npm/font-proxima-nova@1.0.1/style.min.css");
        element.appendChild(link);
        
        const size = element.getAttribute("data-size");
        plugin_button = document.createElement("button");
        plugin_button.innerHTML = "Showing Bee";
        plugin_button = sbButton(plugin_button, size ? size : "normal");
    
        plugin_button.addEventListener("click", () => onPluginClick(mls_number));
    
        element.appendChild(plugin_button);
    } else {
        console.log('missing mls number!')
    }
}

const sbButton = (element, size) => {
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
    element.addEventListener("mouseenter", (event) => {
        element.style.background = '#FAC91F'
    });
    element.addEventListener("mouseleave", (event) => {
        element.style.background = "transparent linear-gradient(103deg, #FAC91F 0%, #F8A728 100%) 0% 0% no-repeat padding-box";
    });

    return element
}


const onPluginClick = (mls_number) => {
    window.open(`https://www.showingbee.com/listings/1/${mls_number}`, '_blank');
}