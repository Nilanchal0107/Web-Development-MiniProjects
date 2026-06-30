CHALLENGE - Simplify the pagination controls

GOAL: Something like this
<< | 3 | 4 | 5 | >>

1. A button to jump to the first page
   - Use << for this button

2. The current page and its immediate neighbours
   - For example, if we are on page 4, show 3, 4, and 5

3. A button to jump to the last page
   - Use >> for this button

Make sure you:
- Don’t render page numbers that don’t exist, like 0 or totalPages + 1
- Don’t duplicate page links
- Don’t show << if page 1 is already visible
- Don’t show >> if the last page is already visible

EXAMPLES:

If we are on page 3 of 5, show:
<< 3 4 5 >>

If we are on page 1 of 5, show:
1 2 >>

If we are on page 5 of 5, show:
<< 4 5