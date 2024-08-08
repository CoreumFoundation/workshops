export const connectLeap = async (config) => {
    try {
        if (window.leap) {
            await window.leap.enable(config.chain_id);
        }
        else {
            throw {
                thrower: "_connectLeap",
                error: new Error("Please install the Leap Wallet Extension"),
            };
        }
    }
    catch (e) {
        throw {
            thrower: e.thrower || "connectLeap",
            error: e,
        };
    }
};
export const getLeapOfflineSigner = async (chain_id) => {
    return window.leap.getOfflineSignerAuto(chain_id);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGVhcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZXJ2aWNlcy9sZWFwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUlBLE1BQU0sQ0FBQyxNQUFNLFdBQVcsR0FBRyxLQUFLLEVBQUUsTUFBMkIsRUFBRSxFQUFFO0lBQy9ELElBQUk7UUFDRixJQUFJLE1BQU0sQ0FBQyxJQUFJLEVBQUU7WUFDZixNQUFNLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUMzQzthQUFNO1lBQ0wsTUFBTTtnQkFDSixPQUFPLEVBQUUsY0FBYztnQkFDdkIsS0FBSyxFQUFFLElBQUksS0FBSyxDQUFDLDBDQUEwQyxDQUFDO2FBQzdELENBQUM7U0FDSDtLQUNGO0lBQUMsT0FBTyxDQUFNLEVBQUU7UUFDZixNQUFNO1lBQ0osT0FBTyxFQUFFLENBQUMsQ0FBQyxPQUFPLElBQUksYUFBYTtZQUNuQyxLQUFLLEVBQUUsQ0FBQztTQUNULENBQUM7S0FDSDtBQUNILENBQUMsQ0FBQztBQUVGLE1BQU0sQ0FBQyxNQUFNLG9CQUFvQixHQUFHLEtBQUssRUFBRSxRQUFnQixFQUFFLEVBQUU7SUFDN0QsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ3BELENBQUMsQ0FBQyJ9