# 🤢 Problem 3: Messy React

1. Type Safety Issues:

Using any type for blockchain parameter in getPriority
Inconsistent balance types between WalletBalance and FormattedWalletBalance in sorting/filtering
Missing type definition for 'blockchain' in WalletBalance interface

2. Logic Errors:

Filter logic is incorrect: uses undefined lhsPriority instead of balancePriority
Filter returns true for amounts <= 0, which seems inverse of intended logic
Sort function doesn't handle equal priorities
Sort function doesn't consider amount or other secondary sorting criteria

3. Performance Issues:

Multiple iterations over balances (filter -> sort -> map -> map)
Redundant getPriority calls in sort function
Unnecessary spreading of props
Prices dependency in useMemo isn't used in the calculation

4. React Best Practices:

Using index as key in mapped components
Unused prices in useMemo dependency array
Mixing formatted and unformatted balance types
BoxProps interface extension isn't utilized effectively

5. Code Structure:

getPriority function could be a constant lookup object
Blockchain types should be a union type
Missing error boundaries and loading states
Missing proper prop validation
