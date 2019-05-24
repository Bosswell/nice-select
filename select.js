class NiceSelect {
    constructor(onSelect) {
        let idSelectName = 'nice-select';
        let classOptionName = 'nice-option';

        let $select = $('#' + idSelectName);
        let idActiveTextName = idSelectName +'-active-text';
        let idActiveValueName = idSelectName +'-active-value';
        let $activeOption = null;

        try {
            if ($select.attr('name') === undefined)
                throw 'Attribute [name] has not been defined fot tag <select>...</select>';

            $select.prepend('<div id="'+ idActiveTextName +'"></div>');
            $select.prepend('<input type="hidden" name="'+ $select.attr('name') +'" id="'+ idActiveValueName +'">');
            $select.replaceWith('<div id="'+ idSelectName +'">' + $select.html() + '</div>');
            // Catch element once again after re-tagging
            $select = $('#' + idSelectName);

            let $classOption =  $select.find('.' + classOptionName);
            $classOption.each((index, element) => {
                let $element = $(element);
                if ($element.data('default') === 'true')
                    $activeOption = $element;

                $element.replaceWith('<div class="' + $element.attr('class') + '" data-value="' + $element.val() + '">' + $element.text() + '</div>');
            });

            // Catch element once again after re-tagging
            $classOption = $select.find('.' + classOptionName);

            if ($activeOption === null)
                $activeOption = $classOption.eq(0);

            let $idActiveText = $select.find('#' + idActiveTextName);
            let $idActiveValue = $select.find('#' + idActiveValueName);

            $idActiveText.text($activeOption.text());
            $idActiveValue.val($activeOption.data('value'));

            $idActiveText.on('click', function () {
                if ($select.attr('data-is-toggled') === 'true') {
                    $classOption.hide();
                    $select.attr('data-is-toggled', 'false');
                } else {
                    $classOption.show();
                    $select.attr('data-is-toggled', 'true');
                }
            });

            $classOption.on('click', function () {
                let $option = $(this);

                $idActiveText.text($option.text());
                $idActiveValue.val($option.data('value'));
                $classOption.hide();
                $select.attr('data-is-toggled', 'false');

                if (typeof onSelect === 'function')
                    onSelect($option);
            });

            // Select was previously hidden to prevent ugly tags swap
            $select.show();

        } catch (errors) {
            console.error(errors);
        }
    }
}


