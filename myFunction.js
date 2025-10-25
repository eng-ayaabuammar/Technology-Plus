$(document).ready(function () {
  $('.Add_form').on('submit', function (e) {
    e.preventDefault();
    const appName = $('input[name="app_name"]').val().trim();
    if (!appName) {
      alert("Please enter app name.");
      $('input[name="app_name"]').focus();
      return;
    }

    const company = $('input[name="company"]').val().trim();
    if (!company) {
      alert("Please enter company name.");
      $('input[name="company"]').focus();
      return;
    }

    const website = $('input[name="website"]').val().trim();
    if (!website) {
      alert("Please enter website link.");
      $('input[name="website"]').focus();
      return;
    }

    const usage = $('select[name="usage"]').val();
    if (!usage) {
      alert("Please select type of usage.");
      $('select[name="usage"]').focus();
      return;
    }

    const description = $('textarea[name="description"]').val().trim();
    if (!description) {
      alert("Please enter description.");
      $('textarea[name="description"]').focus();
      return;
    }

    const radio = $('input[name="radio"]:checked').val();
    if (!radio) {
      alert("Please choice type of app.");
      $('input[name="radio"]').first().focus();
      return;
    }
    const logoFile = $('input[type="file"]')[0].files[0];
    const mediaFile = $('input[type="file"]')[1].files[0];

    if (!logoFile) {
      alert("Enter logo.");
      $('input[type="file"]').eq(0).focus();
      return;
    }

    if (!mediaFile) {
      alert("Enter file.");
      $('input[type="file"]').eq(1).focus();
      return;
    }
    const reader1 = new FileReader();
    const reader2 = new FileReader();

    reader1.onload = function (e1) {
      const logoData = e1.target.result;

      reader2.onload = function (e2) {
        const mediaData = e2.target.result;
        const appData = {
          appName,
          company,
          website,
          usage,
          description,
          radio,
          logoData,
          mediaData
        };
        sessionStorage.setItem('newApp', JSON.stringify(appData));
        window.location.href = 'apps.html';
      };

      reader2.readAsDataURL(mediaFile);
    };

    reader1.readAsDataURL(logoFile);
  });
  const newApp = sessionStorage.getItem('newApp');
  if (newApp) {
    const data = JSON.parse(newApp);

    const newRow = `
      <tr>
        <td>${data.appName}</td>
        <td>${data.company}</td>
        <td>${data.usage}</td>
        <td><input type="checkbox" ${data.radio === 'Free' ? 'checked' : ''}/></td>
        <td><input class="Show_details" type="checkbox"/></td>
      </tr>
      <tr class="details" style="display:none;">
        <td colspan="5">
          <div class="show_url"><strong>URL : </strong><a href="${data.website}">${data.website}</a></div>
          <div class="show_caption"><p>${data.description}</p></div>
          <div class="marge">
            <div class="show_logo"><strong>Logo : </strong><br/><img class="app_logo" src="${data.logoData}"/></div>
            <div class="show_file"><strong>File: </strong><br/>
              <video class="app_vid" width="320" height="240" controls>
                <source src="${data.mediaData}">
              </video>
            </div>
          </div>
        </td>
      </tr>
    `;

    $('.Apps_table').append(newRow);
    sessionStorage.removeItem('newApp');
  }
  $('.Apps_table').on('change', '.Show_details', function () {
    const nextRow = $(this).closest('tr').next('.details');
    if ($(this).is(':checked')) {
      nextRow.show();
    } else {
      nextRow.hide();
    }
  });
});