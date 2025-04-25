export function toggleTargetSize(isChecked) {
    // a list of the elements we want to test
    const interactiveRoles = ['button', 'a', '[role="button"]', '[role="link"]'];
    // join the list to iterate
    const roleList =  document.querySelectorAll(interactiveRoles.join(','));
    // class for the label
    const clsList = ['equa11y-label'];
    // classes to identify the elements 
    const elList = ['equa11y-border', 'equa11y-size'];

    // toggle if the extension checkbox is checked or not
    isChecked ?  targetSize_checked() : targetSize_unchecked();

    // handle the checked state
    function targetSize_checked() {
        // loop through the list of interactive elements
       roleList.forEach(element => {
            // don't do anything if the label already has a label
            if(!element.classList.contains('equa11y-size')) {
                const dimensions = getComputedDimensions(element);
                // if dimensions are less than 1, don't add a label
                if(dimensions.height > 0 || dimensions.width > 0) {
                    const label = document.createElement('div');
                    label.innerHTML = `${dimensions.width}px w x ${dimensions.height}px h`;
                    label.classList.add(...clsList);

                    // if the element is too small, change the label
                    if(dimensions.width < 24 || dimensions.height < 24) {
                        label.style.cssText = 'background-color: #AB1B18 !important; outline: 2px dashed black;';
                    }

                    element.classList.add(...elList);
                    // add the label before the element
                    element.parentNode.insertBefore(label, element);
                }
            }
        });
    }

    // handle the unchecked state
    function targetSize_unchecked() {
        document.querySelectorAll('.equa11y-size').forEach(el => {
            el.classList.remove(...elList);
        });

        document.querySelectorAll('.equa11y-label').forEach(el => {
            el.remove();
        });
    }

    // get the dimensions of the element
    function getComputedDimensions(element) {
        const dimensions = {
            width: element.offsetWidth,
            height: element.offsetHeight
        }
        
        return dimensions;
    }
}