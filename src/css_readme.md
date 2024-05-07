# GSAP CSS

# GSAP CSS - AutopAlpha

GSAP's AutoAlpha is a special property that combines opacity and visibility control in a single value. When applied to an element, it automatically adjusts both the opacity and visibility properties based on the specified value.

When the value is set to 1, it sets the opacity to 1 (fully visible) and visibility to 'visible'.
When the value is set to 0, it sets the opacity to 0 (completely transparent) and visibility to 'hidden'.

Using AutoAlpha simplifies the process of fading elements in and out while also handling their visibility state. This can be particularly useful when you want to toggle the visibility of an element along with its opacity without having to manage both properties separately.

Typically AutoAlpha is used to initially hide elements that are animated to become visible. This is to avoid a glicth on page load.

GLOBAL CUSTOM CODE (overrules all on live site):

<style>
    // Hides all AutoAlpha elements on page load.
    [autoalpha="visible"], [autoalpha="hidden"] 
        { visibility:hidden }

    // Makes sure elements are still visible in WF Editor Mode
    html.w-editor [autoalpha="visible"], html.w-editor [autoalpha="hidden"] 
        { visibility:visible !important }
</style>

INLINE CUSTOM CODE (Desing only, will be overruled on live site):

<style>
    // Shows AutoAlpha elements
    [autoalpha="visible"] 
        { visibility:visible; }
    // Hides AutoAlpha elements
    [autoalpha="hidden"]  
        { visibility:hidden; }
</style>
