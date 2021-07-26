const bday = `<mjml>
<mj-head>
  <mj-title>Discount Light</mj-title>
  <mj-preview>Pre-header Text</mj-preview>
  <mj-attributes>
    <mj-all font-family="'Helvetica Neue', Helvetica, Arial, sans-serif"></mj-all>
    <mj-text font-weight="400" font-size="16px" color="#000000" line-height="24px" font-family="'Helvetica Neue', Helvetica, Arial, sans-serif"></mj-text>
  </mj-attributes>
  <mj-style inline="inline">
    .body-section {
    -webkit-box-shadow: 1px 4px 11px 0px rgba(0, 0, 0, 0.15);
    -moz-box-shadow: 1px 4px 11px 0px rgba(0, 0, 0, 0.15);
    box-shadow: 1px 4px 11px 0px rgba(0, 0, 0, 0.15);
    }
  </mj-style>
  <mj-style inline="inline">
    .text-link {
    color: #5e6ebf
    }
  </mj-style>
  <mj-style inline="inline">
    .footer-link {
    color: #888888
    }
  </mj-style>

</mj-head>
<mj-body background-color="#E7E7E7" width="600px">
  <mj-section full-width="full-width" background-color="#040B4F" padding-bottom="0">
    <mj-column width="100%">
     
      <mj-text color="#ffffff" font-weight="bold" align="center" text-transform="uppercase" font-size="16px" letter-spacing="1px" padding-top="30px">
        {{wishes}}
        <br />
        
      </mj-text>
      
      <mj-image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThDlWge9HgtL5-6jMvEZo76BneOgZBHIznVA&usqp=CAU" width="600px" alt="" padding="0" href="https://google.com" />
    </mj-column>
  </mj-section>
  
  <mj-wrapper padding-top="0" padding-bottom="0" css-class="body-section">
    <mj-section background-color="#ffffff" padding-left="15px" padding-right="15px">
      <mj-column width="100%">
        <mj-text color="#637381" font-size="16px">
          Hello {{userFirstName}} {{userLastName}}
        </mj-text>
        <mj-text color="#637381" font-size="16px">
          {{customMessage}}
        </mj-text>
              
      </mj-column>
    </mj-section>

    <mj-section background-color="#ffffff" padding-left="15px" padding-right="15px">
      <mj-column width="50%">
        
      </mj-column>
    </mj-section>
    <mj-section background-color="#ffffff" padding-left="15px" padding-right="15px">
     
    </mj-section>
  </mj-wrapper>

  <mj-wrapper full-width="full-width">
    <mj-section>
      <mj-column width="100%" padding="0">
        <mj-social font-size="15px" icon-size="30px" mode="horizontal" padding="0" align="center">
          <mj-social-element name="facebook" href="https://mjml.io/" background-color="#A1A0A0">
          </mj-social-element>
          <mj-social-element name="google" href="https://mjml.io/" background-color="#A1A0A0">
          </mj-social-element>
          <mj-social-element name="twitter" href="https://mjml.io/" background-color="#A1A0A0">
          </mj-social-element>
          <mj-social-element name="linkedin" href="https://mjml.io/" background-color="#A1A0A0">
          </mj-social-element>
        </mj-social>
        <mj-text color="#445566" font-size="11px" font-weight="bold" align="center">
          View this email in your browser
        </mj-text>
        <mj-text color="#445566" font-size="11px" align="center" line-height="16px">
          You are recieving this message as you are part of Badrodia Family.
        </mj-text>
        
      </mj-column>
    </mj-section>
    <mj-section padding-top="0">
      <mj-group>
        <mj-column width="100%" padding-right="0">
          <mj-text color="#445566" font-size="11px" align="center" line-height="16px" font-weight="bold">
            <a class="footer-link" href="https://www.google.com">Privacy</a>&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;&#xA0;<a class="footer-link" href="https://www.google.com">Unsubscribe</a>
          </mj-text>
        </mj-column>
      </mj-group>

    </mj-section>
  </mj-wrapper>

</mj-body>
</mjml>`;

export default bday;
