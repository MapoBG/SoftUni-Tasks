const contactsTemplate = `{{#each contacts}}
    <div class="contact card">
        <div>
          <i class="far fa-user-circle gravatar"></i>
        </div>
        <div class="info">
          <h2>Name: {{name}}</h2>
          <button class="detailsBtn" onclick="showDetails({{id}})">Details</button>
          <div class="details" id="{{id}}" style="display: none;">
            <p>Phone number: {{phoneNumber}}</p>
            <p>Email: {{email}}</p>
          </div>
        </div>
    </div>
    {{/each}}`