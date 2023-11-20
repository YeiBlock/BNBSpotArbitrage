document.addEventListener('DOMContentLoaded', function () {
  const table = document.getElementById('arbitrageTable');
  const rows = table.getElementsByTagName('tr');

  for (let i = 0; i < rows.length; i++) {
    rows[i].addEventListener('mouseover', function () {
      // Get the text content of the row
      const rowData = Array.from(this.cells).map(cell => cell.textContent).join('\t');

      // Create a temporary textarea to copy the text
      const tempTextarea = document.createElement('textarea');
      tempTextarea.value = rowData;

      // Append the textarea to the document
      document.body.appendChild(tempTextarea);

      // Select and copy the text
      tempTextarea.select();
      document.execCommand('copy');

      // Remove the temporary textarea
      document.body.removeChild(tempTextarea);

      // You can also provide visual feedback to the user, e.g., highlighting the row
      this.style.backgroundColor = '#aaffaa'; // Change to your desired highlight color

      // Reset the background color after a short delay
      setTimeout(() => {
        this.style.backgroundColor = '';
      }, 1000);
    });
  }
});
